'use client';
import RegisterForm from '@/components/RegisterForm';
import { useAppDispatch } from '@/hooks/hooks';
import { setCompanyData } from '@/slices/companySlice';
import { RootState } from '@/store';
import { CompanyType } from '@/types/types';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';

const Authentication: React.FC = () => {
  const dispatch = useAppDispatch();
  const { company } = useSelector((state: RootState) => state);

  const [companyFormData, setCompanyFormData] = useState<CompanyType>(company);
  const [companyFormErrors, setCompanyFormErrors] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const validateFields = () => {
    let isValid = true;
    const newErrorList = [...companyFormErrors];

    if (companyFormData.companyName === '') {
      newErrorList.push('companyName');
      isValid = false;
    }
    if (companyFormData.corporationDate === '') {
      newErrorList.push('corporationDate');
      isValid = false;
    }
    if (companyFormData.address === '') {
      newErrorList.push('address');
      isValid = false;
    }
    // if (companyFormData.documents === '') newErrorList.push('documents');

    setCompanyFormErrors(newErrorList);
    return isValid;
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateFields()) {
      dispatch(setCompanyData(companyFormData));
    }
  };

  const onChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
    setCompanyFormData({
      ...companyFormData,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeDate = (date: dayjs.Dayjs | null) => {
    setCompanyFormData({
      ...companyFormData,
      corporationDate: dayjs(date).format(),
    });
  };

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFiles([...files, selectedFile]);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        const base64String = reader.result?.toString();
        setCompanyFormData({
          ...companyFormData,
          documents: [...(companyFormData.documents ?? ''), base64String ?? ''],
        });
      };
    }
    return;
  };

  const handleClearFiles = () => {
    setCompanyFormData({
      ...companyFormData,
      documents: [],
    });
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-10 px-5 py-10">
      <Typography variant="h6">Enter your company data</Typography>
      <RegisterForm
        handleUploadFile={handleUploadFile}
        errorsList={companyFormErrors}
        companyFormData={companyFormData}
        onChange={onChangeFormData}
        onChangeDate={onChangeDate}
        handleRegister={handleRegister}
        handleClearFiles={handleClearFiles}
      />
    </div>
  );
};

export default Authentication;
