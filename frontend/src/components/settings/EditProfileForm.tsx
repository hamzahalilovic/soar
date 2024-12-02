import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../../redux/slices/userSlice";
import { RootState, AppDispatch } from "../../redux/store";

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const SaveButton = styled.button`
  grid-column: span 2;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProfilePictureWrapper = styled.div`
  grid-column: span 2;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const EditButton = styled.label`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  input {
    display: none;
  }
`;

const EditProfileForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    dateOfBirth: "",
    permanentAddress: "",
    presentAddress: "",
    city: "",
    country: "",
    postalCode: "",
    profileImage: "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        permanentAddress: user.permanentAddress,
        presentAddress: user.presentAddress,
        city: user.city,
        country: user.country,
        postalCode: user.postalCode,
        profileImage: user.profileImage,
      });
      setProfileImagePreview(null);
    }
  }, [dispatch, status, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setProfileImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = { ...formData };

    if (profileImage) {
      const uploadFormData = new FormData();
      uploadFormData.append("profileImage", profileImage);

      const uploadResponse = await fetch(
        "https://soar-backend.vercel.app/user/upload",
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      const result = await uploadResponse.json();

      if (!uploadResponse.ok) {
        console.error("Image upload failed:", result.error);
        return;
      }

      updatedData.profileImage = result.imageUrl;
    }

    const response = await dispatch(updateUser(updatedData));

    setProfileImagePreview(null);
    setProfileImage(null);
  };

  console.log("form", formData);

  if (status === "loading") return <div>Loading...</div>;

  const fullImageUrl = formData.profileImage;

  const displayImage =
    profileImagePreview ||
    fullImageUrl ||
    "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";

  return (
    <Form onSubmit={handleSubmit}>
      <ProfilePictureWrapper>
        <ProfileImage src={displayImage} alt="Profile" />
        <EditButton>
          Edit
          <input type="file" onChange={handleFileChange} />
        </EditButton>
      </ProfilePictureWrapper>
      <FieldGroup>
        <Label>Your Name</Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </FieldGroup>

      <FieldGroup>
        <Label>User Name</Label>
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </FieldGroup>

      <FieldGroup>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </FieldGroup>

      <FieldGroup>
        <Label>Password</Label>
        <Input type="password" value="********" disabled />
      </FieldGroup>

      <FieldGroup>
        <Label>Date of Birth</Label>
        <Input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
        />
      </FieldGroup>

      <FieldGroup>
        <Label>Present Address</Label>
        <Input
          type="text"
          name="presentAddress"
          value={formData.presentAddress}
          onChange={handleInputChange}
        />
      </FieldGroup>

      <FieldGroup>
        <Label>Permanent Address</Label>
        <Input
          type="text"
          name="permanentAddress"
          value={formData.permanentAddress}
          onChange={handleInputChange}
        />
      </FieldGroup>

      <FieldGroup>
        <Label>City</Label>
        <Input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
      </FieldGroup>

      <FieldGroup>
        <Label>Postal Code</Label>
        <Input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
        />
      </FieldGroup>

      <FieldGroup>
        <Label>Country</Label>
        <Input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
        />
      </FieldGroup>

      <SaveButton type="submit">Save</SaveButton>
    </Form>
  );
};

export default EditProfileForm;
