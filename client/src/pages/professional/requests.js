import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Header from "../../components/header/header";
import Loader from "../../components/Loader/Loader";
import { getReceivedRequests, updateRequestStatus, clearErrors } from "../../actions/requestAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusVariant = {
  pending: "secondary",
  accepted: "default",
  declined: "destructive",
};

export default function ProfessionalRequests() {
  const dispatch = useDispatch();
  const { loading, requests, error } = useSelector((state) => state.receivedRequests);
  const { error: updateError } = useSelector((state) => state.updateRequest);

  useEffect(() => {
    dispatch(getReceivedRequests());
  }, [dispatch]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
  }, [dispatch, updateError]);

  const handleUpdate = (id, status) => {
    dispatch(updateRequestStatus(id, status));
  };

  return (
    <>
      <Header />
      <div className="container py-10">
        <h1 className="mb-6 text-2xl font-semibold">Requests Received</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : requests.length === 0 ? (
          <p className="text-muted-foreground">No requests yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {requests.map((request) => (
              <Card key={request._id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{request.listing?.title}</CardTitle>
                    <Badge variant={statusVariant[request.status]}>{request.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 text-sm">
                  <p className="text-muted-foreground">{request.message}</p>
                  <p className="text-xs text-muted-foreground">
                    From: {request.user?.name} ({request.user?.email})
                  </p>
                  {request.status === "pending" && (
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" onClick={() => handleUpdate(request._id, "accepted")}>
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdate(request._id, "declined")}
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
