import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../../redux/slices/userSlice";
import { RootState, AppDispatch } from "../../redux/store";
import Icon from "../common/Icon";

import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../utils/formValidators";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 21px;
  gap: 57px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 30px 15px;
    gap: 30px;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfilePictureWrapper = styled.div`
  grid-column: span 2;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 90px;
  height: 90px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const Input = styled.input`
  width: 418px;
  height: 50px;
  padding: 20px 16px;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 18.15px;
  text-align: left;
  color: #718ebf;
  background: #ffffff;
  border: 1px solid #dfeaf2;
  border-radius: 15px;
  outline: none;

  &::placeholder {
    color: #718ebf;
  }

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 15px;
  }
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 400;
  color: #232323;
  margin-bottom: 11px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorText = styled.div`
  color: #d9534f;
  font-size: 12px;
  margin-top: 5px;
`;

const SaveButton = styled.button`
  width: 190px;
  height: 50px;
  margin-top: 30px;
  background: #232323;
  color: #ffffff;
  font-size: 15px;
  font-weight: 400;
  border-radius: 15px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #444444;
  }
`;

const ProfileImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
`;

const EditIconWrapper = styled.label`
  position: absolute;
  top: 61px;
  left: 68px;
  width: 30px;
  height: 30px;
  background-color: #232323;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #444444;
  }

  svg {
    fill: #ffffff;
  }

  input {
    display: none;
  }
`;

const SaveButtonContainer = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
`;

const AlertContainer = styled.div`
  position: fixed; /* Fixed position to keep it at the top of the viewport */
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000; /* High z-index to ensure it appears above other content */
  width: 100%; /* Full width */
  max-width: 600px; /* Optional: Limit the width */
  padding: 10px;
`;

const Alert = styled.div<{ success?: boolean }>`
  padding: 10px 15px;
  border-radius: 5px;
  background-color: ${(props) => (props.success ? "#d4edda" : "#f8d7da")};
  color: ${(props) => (props.success ? "#155724" : "#721c24")};
  border: ${(props) =>
    props.success ? "1px solid #c3e6cb" : "1px solid #f5c6cb"};
  text-align: center;
  font-weight: 600;
`;

const EditProfileForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
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
  const [alert, setAlert] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(formData.name)) newErrors.name = "Name is required.";
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email.";
    if (!validatePassword(formData.password))
      newErrors.password =
        "Password must have 8+ characters, 1 uppercase, and 1 number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setProfileImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedData = { ...formData };

    try {
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
          throw new Error(result.error || "Image upload failed");
        }

        updatedData.profileImage = result.imageUrl;
      }

      await dispatch(updateUser(updatedData));
      setAlert({ message: "Profile updated successfully!", success: true });
    } catch (error: any) {
      setAlert({
        message: error.message || "An error occurred",
        success: false,
      });
    }

    setTimeout(() => setAlert(null), 5000);
  };

  const fullImageUrl = formData.profileImage;

  const displayImage =
    profileImagePreview ||
    fullImageUrl ||
    "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";

  return (
    <Wrapper>
      {alert && (
        <AlertContainer>
          <Alert success={alert.success}>{alert.message}</Alert>
        </AlertContainer>
      )}
      <ProfilePictureWrapper>
        <ProfileImage src={displayImage} alt="Profile" />
        <EditIconWrapper>
          <Icon name="pencil" size={15} />
          <input type="file" onChange={handleFileChange} />
        </EditIconWrapper>
      </ProfilePictureWrapper>
      <Form onSubmit={handleSubmit}>
        <FieldGroup>
          <Label>Your Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
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
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </FieldGroup>

        <FieldGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
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

        <SaveButtonContainer>
          <SaveButton type="submit">Save</SaveButton>
        </SaveButtonContainer>
      </Form>
    </Wrapper>
  );
};

export default EditProfileForm;
