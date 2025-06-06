import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStats, useSearchExtensions } from "@/hooks/useSearchExtensions";
import { ExtensionCard } from "@/components/ExtensionCard";
import { Skeleton } from "@/components/ui/skeleton";

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const duration = 2000; // 动画持续时间2秒
  const startValue = 0;
  const increment = Math.ceil(value / (duration / 16)); // 每16ms增加的值

  useEffect(() => {
    let startTime = null;
    let animationFrameId = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const currentValue = Math.floor(
        startValue + (value - startValue) * percentage
      );
      setDisplayValue(currentValue);

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

const Index = () => {
  const { data: stats } = useStats();

  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [extensions, setExtensions] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, error } = useSearchExtensions(searchQuery, page);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setExtensions((prev) => (page === 1 ? data : [...prev, ...data]));
      setHasMore(data.length > 0);
    }
  }, [data, page]);

  const observer = useRef();

  const lastExtensionRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setExtensions([]); // 清空当前结果
    setPage(1); // 重置页码
    setHasMore(true); // 重置加载状态
    setSearchQuery(searchInputRef.current.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 英雄区域 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-20 px-4 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            发现最佳Chrome扩展
          </h1>
          <p className="text-xl mb-8">
            {stats ? (
              <>
                超过{" "}
                <span className="inline-block font-bold">
                  <AnimatedNumber value={stats.total} />
                </span>{" "}
                个扩展程序
              </>
            ) : (
              "探索数千款提升您浏览体验的扩展程序"
            )}
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
            <Input
              ref={searchInputRef}
              className="pl-12 pr-4 py-6 text-lg rounded-full shadow-lg text-black"
              placeholder="搜索扩展程序"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
          </form>
          <p className="text-sm mt-2 text-blue-100">按下 / 快速聚焦搜索框</p>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">搜索结果: {searchQuery}</h2>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-lg" />
                ))}
              </div>
            ) : error ? (
              <div className="text-red-500 p-4 bg-red-50 rounded-lg">
                加载失败: {error.message}
              </div>
            ) : extensions?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {extensions.map((extension, index) => (
                  <ExtensionCard
                    key={extension.id}
                    extension={extension}
                    ref={index === extensions.length - 1 ? lastExtensionRef : null}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">没有找到匹配的扩展程序</p>
              </div>
            )}
          </div>
        )}

        {!searchQuery && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">开始搜索您需要的扩展</h2>
            <p className="text-gray-600 mb-6">
              输入关键词查找最适合您的Chrome扩展程序
            </p>
            <Button size="lg" onClick={() => searchInputRef.current?.focus()}>
              <Search className="mr-2 h-4 w-4" />
              立即搜索
            </Button>
          </div>
        )}
      </div>

      {/* 页脚 */}
      <div className="bg-gray-100 py-6 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-600">
          <p className="mb-2">
            数据来源:{" "}
            <a
              href="https://www.hexacorn.com/blog/2023/10/20/mapping-chrome-extension-ids-to-their-names-part-2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Hexacorn博客 - Chrome扩展ID映射
            </a>
          </p>
          <p>
            图片来源:{" "}
            <a
              href="https://nocode.meituan.com/photo/search"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              美团无代码图片搜索API
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
