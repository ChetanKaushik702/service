import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MapPin, User } from "lucide-react";
import Header from "../../components/header/header";
import Loader from "../../components/Loader/Loader";
import { getListingDetail } from "../../actions/listingAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ServiceDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, listing, error } = useSelector((state) => state.listingDetails);

  useEffect(() => {
    dispatch(getListingDetail(id));
  }, [dispatch, id]);

  return (
    <>
      <Header />
      <div className="container max-w-2xl py-10">
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-xl">{listing.title}</CardTitle>
                <Badge variant="secondary">{listing.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">{listing.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {listing.location}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {listing.professional && listing.professional.name}
                </span>
                <span className="font-semibold">
                  ${listing.rate}
                  {listing.rateType === "hourly" ? "/hr" : ""}
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
