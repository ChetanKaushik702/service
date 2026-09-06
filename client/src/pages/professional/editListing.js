import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Header from "../../components/header/header";
import Loader from "../../components/Loader/Loader";
import { getListingDetail, updateListing, clearErrors } from "../../actions/listingAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function EditListing() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const { loading: detailLoading, listing } = useSelector((state) => state.listingDetails);
  const { loading, error, isUpdated } = useSelector((state) => state.newListing);

  const [form, setForm] = useState(null);

  useEffect(() => {
    dispatch(getListingDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (listing && listing._id === id) {
      setForm({
        title: listing.title,
        description: listing.description,
        category: listing.category,
        rate: listing.rate,
        rateType: listing.rateType,
        location: listing.location,
      });
    }
  }, [listing, id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Listing updated successfully");
      history.push("/professional/listings");
    }
  }, [dispatch, error, isUpdated, alert, history]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateListing(id, { ...form, rate: Number(form.rate) }));
  };

  if (detailLoading || !form) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container flex justify-center py-10">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Edit Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="listing-title">Title</Label>
                <Input
                  id="listing-title"
                  name="title"
                  required
                  value={form.title}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="listing-description">Description</Label>
                <Textarea
                  id="listing-description"
                  name="description"
                  required
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="listing-category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm({ ...form, category: value })}
                >
                  <SelectTrigger id="listing-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="listing-rate">Rate</Label>
                  <Input
                    id="listing-rate"
                    name="rate"
                    type="number"
                    min="0"
                    required
                    value={form.rate}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="listing-rateType">Rate type</Label>
                  <Select
                    value={form.rateType}
                    onValueChange={(value) => setForm({ ...form, rateType: value })}
                  >
                    <SelectTrigger id="listing-rateType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="fixed">Fixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="listing-location">Location</Label>
                <Input
                  id="listing-location"
                  name="location"
                  required
                  value={form.location}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
