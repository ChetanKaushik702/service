import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Pencil, Trash2 } from "lucide-react";
import Header from "../../components/header/header";
import Loader from "../../components/Loader/Loader";
import { getMyListings, deleteListing, clearErrors } from "../../actions/listingAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfessionalListings() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, listings, error } = useSelector((state) => state.myListings);
  const { isDeleted, error: deleteError } = useSelector((state) => state.newListing);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    dispatch(getMyListings());
  }, [dispatch, error, deleteError, isDeleted, alert]);

  const handleDelete = (id) => {
    dispatch(deleteListing(id));
  };

  return (
    <>
      <Header />
      <div className="container py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">My Listings</h1>
          <Button asChild>
            <Link to="/professional/listings/new">New Listing</Link>
          </Button>
        </div>

        {loading ? (
          <Loader />
        ) : listings.length === 0 ? (
          <p className="text-muted-foreground">
            You haven't created any listings yet.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <Card key={listing._id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{listing.title}</CardTitle>
                    <Badge variant={listing.isActive ? "default" : "secondary"}>
                      {listing.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {listing.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span>{listing.category}</span>
                    <span className="font-semibold">
                      ${listing.rate}
                      {listing.rateType === "hourly" ? "/hr" : ""}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/professional/listings/${listing._id}/edit`}>
                        <Pencil className="mr-1 h-4 w-4" /> Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(listing._id)}
                    >
                      <Trash2 className="mr-1 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
