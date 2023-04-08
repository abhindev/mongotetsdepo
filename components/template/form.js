import { useState } from "react";

const MyForm = ({id}) => {
    // console.log (id._id)

    const _id = id._id

  const [formData, setFormData] = useState({
    username: "",
    review: "",
    rating: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/product/${_id}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        // Reset form data
        setFormData({
          username: "",
          review: "",
          rating:0,
        });
      } else {
        console.error("Failed to submit form.");
      }
    } catch (error) {
      console.error("Failed to submit form.", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="review"
        name="review"
        value={formData.review}
        onChange={handleChange}
        placeholder="review"
      />
      <input
        type="number"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        placeholder="rating"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;