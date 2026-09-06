import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MapPin } from "lucide-react";
import Header from "../../components/header/header";
import { getListings } from "../../actions/listingAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Home Cleaning",
  "Plumbing",
  "Electrical",
  "Tutoring",
  "Beauty & Wellness",
  "Photography",
  "Other",
];

export default function Services() {
  const dispatch = useDispatch();
  const { loading, listings, error } = useSelector((state) => state.listings);
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (location) params.set("location", location);
    const queryString = params.toString() ? `?${params.toString()}` : "";
    dispatch(getListings(queryString));
  }, [dispatch, category, location]);

  return (
    <>
      <Header />
      <div className="container py-10">
        <h1 className="mb-6 text-2xl font-semibold">Browse Services</h1>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="sm:w-[220px]">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Filter by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="sm:max-w-xs"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-lg" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <p className="text-muted-foreground">No services found. Try a different filter.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <Link key={listing._id} to={`/services/${listing._id}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{listing.title}</CardTitle>
                      <Badge variant="secondary">{listing.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {listing.description}
                    </p>
                    <div className="flex items-center justify-between pt-2 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {listing.location}
                      </span>
                      <span className="font-semibold">
                        ${listing.rate}
                        {listing.rateType === "hourly" ? "/hr" : ""}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
