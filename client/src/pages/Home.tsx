import { useGetAllApplicationsQuery } from "../redux/api/appSlice";
import Header from "../components/Header";
import AppCard from "../components/AppCard";
import { useNavigate } from "react-router-dom";
import { AppType } from "../types/type";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

const Home = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>(""); // Raw user input
  const [filteredApps, setFilteredApps] = useState<AppType[]>([]); // Filtered apps
  const { data, isSuccess, isLoading } = useGetAllApplicationsQuery();
  const debouncedSearch = useDebounce(searchInput);

  // Load all apps into state when data is fetched
  useEffect(() => {
    if (isSuccess && data?.data) {
      setFilteredApps(data.data);
    }
  }, [isSuccess, data]);

  // Apply filtering whenever debounced search input changes
  useEffect(() => {
    if (isSuccess && data?.data) {
      const filtered = data.data.filter((app) =>
        app.app_name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setFilteredApps(filtered);
    }
  }, [debouncedSearch, isSuccess, data]);

  const handleSelect = (app: AppType) => {
    navigate(`/application/${app.id}`, { state: { app } });
  };

  return (
    <div>
      <Header setSearchInput={setSearchInput} />
      <div className="flex gap-4 flex-wrap">
        {isLoading ? (
          <h1 className="text-center font-bold text-2xl">Loading...</h1>
        ) : (
          filteredApps.map((app) => (
            <div
              className="cursor-pointer"
              key={app.id}
              onClick={() => handleSelect(app)}
            >
              <AppCard app={app} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
