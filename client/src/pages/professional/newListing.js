import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Header from "../../components/header/header";
import { createListing, clearErrors } from "../../actions/listingAction";
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

export default function NewListing() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newListing);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    rate: "",
    rateType: "hourly",
    location: "",
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Listing created successfully");
      history.push("/professional/listings");
    }
  }, [dispatch, error, success, alert, history]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createListing({ ...form, rate: Number(form.rate) }));
  };

  return (
    <>
      <Header />
      <div className="container flex justify-center py-10">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>New Listing</CardTitle>
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
                  placeholder="e.g. Deep house cleaning"
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
                  placeholder="Describe what you offer"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="listing-category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm({ ...form, category: value })}
                >
                  <SelectTrigger id="listing-category">
                    <SelectValue placeholder="Select a category" />
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
                  placeholder="e.g. Bangalore"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                Create Listing
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
