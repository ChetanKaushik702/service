import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/header";
import Loader from "../../components/Loader/Loader";
import { getSentRequests } from "../../actions/requestAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusVariant = {
  pending: "secondary",
  accepted: "default",
  declined: "destructive",
};

export default function MyRequests() {
  const dispatch = useDispatch();
  const { loading, requests, error } = useSelector((state) => state.sentRequests);

  useEffect(() => {
    dispatch(getSentRequests());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container py-10">
        <h1 className="mb-6 text-2xl font-semibold">My Requests</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : requests.length === 0 ? (
          <p className="text-muted-foreground">You haven't sent any requests yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {requests.map((request) => (
              <Card key={request._id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">
                      {request.listing?.title}
                    </CardTitle>
                    <Badge variant={statusVariant[request.status]}>{request.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm">
                  <p className="text-muted-foreground">{request.message}</p>
                  <p className="text-xs text-muted-foreground">
                    To: {request.professional?.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
