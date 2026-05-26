"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterBar from "@/components/FilterBar";
import TileGrid from "@/components/TileGrid";

export default function TilesClient() {
  const searchParams = useSearchParams();

  const [tiles, setTiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTiles();
  }, [searchParams]);

  const fetchTiles = async () => {
    setIsLoading(true);
    setError("");

    try {
      const queryString = searchParams.toString();

      const response = await fetch(
        `/api/tiles${queryString ? "?" + queryString : ""}`
      );

      const data = await response.json();
      setTiles(data.tiles || []);
    } catch (err) {
      setError("Failed to load tiles");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <h1>Browse Our Collection</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <FilterBar onFilterChange={fetchTiles} />

          <div className="lg:col-span-3">
            {error && <div>{error}</div>}
            <TileGrid tiles={tiles} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}