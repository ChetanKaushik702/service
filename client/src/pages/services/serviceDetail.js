import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MapPin, User } from "lucide-react";
import Header from "../../components/header/header";
import Loader from "../../components/Loader/Loader";
import { getListingDetail } from "../../actions/listingAction";
import { createRequest, clearErrors } from "../../actions/requestAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ServiceDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, listing, error } = useSelector((state) => state.listingDetails);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading: requestLoading, success, error: requestError } = useSelector((state) => state.newRequest);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getListingDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (requestError) {
      toast.error(requestError);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Request sent successfully");
      setMessage("");
      dispatch(clearErrors());
    }
  }, [dispatch, requestError, success]);

  const handleRequest = (e) => {
    e.preventDefault();
    dispatch(createRequest(id, message));
  };

  return (
    <>
      <Header />
      <div className="container max-w-2xl py-10">
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <div className="flex flex-col gap-6">
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

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Request this service</CardTitle>
              </CardHeader>
              <CardContent>
                {!isAuthenticated ? (
                  <p className="text-sm text-muted-foreground">
                    <Link to="/login" className="font-medium text-primary hover:underline">
                      Login
                    </Link>{" "}
                    to request this service.
                  </p>
                ) : user?.role === "professional" ? (
                  <p className="text-sm text-muted-foreground">
                    Professional accounts cannot request services.
                  </p>
                ) : (
                  <form onSubmit={handleRequest} className="flex flex-col gap-3">
                    <Textarea
                      placeholder="Describe what you need"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                    <Button type="submit" disabled={requestLoading} className="self-start">
                      Send Request
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
