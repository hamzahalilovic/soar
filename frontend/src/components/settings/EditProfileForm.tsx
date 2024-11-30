import React from "react";
import styled from "styled-components";

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

const EditButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditProfileForm: React.FC = () => {
  return (
    <Form>
      <ProfilePictureWrapper>
        <ProfileImage
          src="https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
          alt="Profile"
        />
        <EditButton>Edit</EditButton>
      </ProfilePictureWrapper>
      <FieldGroup>
        <Label>Your Name</Label>
        <Input type="text" defaultValue="Charlene Reed" />
      </FieldGroup>

      <FieldGroup>
        <Label>User Name</Label>
        <Input type="text" defaultValue="Charlene Reed" />
      </FieldGroup>

      <FieldGroup>
        <Label>Email</Label>
        <Input type="email" defaultValue="charlenereed@gmail.com" />
      </FieldGroup>

      <FieldGroup>
        <Label>Password</Label>
        <Input type="password" defaultValue="********" />
      </FieldGroup>

      <FieldGroup>
        <Label>Date of Birth</Label>
        <Input type="date" defaultValue="1990-01-25" />
      </FieldGroup>

      <FieldGroup>
        <Label>Present Address</Label>
        <Input type="text" defaultValue="San Jose, California, USA" />
      </FieldGroup>

      <FieldGroup>
        <Label>Permanent Address</Label>
        <Input type="text" defaultValue="San Jose, California, USA" />
      </FieldGroup>

      <FieldGroup>
        <Label>City</Label>
        <Input type="text" defaultValue="San Jose" />
      </FieldGroup>

      <FieldGroup>
        <Label>Postal Code</Label>
        <Input type="text" defaultValue="45962" />
      </FieldGroup>

      <FieldGroup>
        <Label>Country</Label>
        <Input type="text" defaultValue="USA" />
      </FieldGroup>

      <SaveButton type="submit">Save</SaveButton>
    </Form>
  );
};

export default EditProfileForm;
