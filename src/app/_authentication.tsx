'use client';
import RegisterForm from '@/components/RegisterForm';
import { useAppDispatch } from '@/hooks/hooks';
import { setCompanyData } from '@/slices/companySlice';
import { RootState } from '@/store';
import { CompanyType } from '@/types/types';
import { encryptCompanyData } from '@/utils';
import { Alert, Backdrop, Snackbar, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';

const Authentication: React.FC = () => {
  const dispatch = useAppDispatch();
  const { company } = useSelector((state: RootState) => state);

  const [companyFormData, setCompanyFormData] = useState<CompanyType>(company);
  const [companyFormErrors, setCompanyFormErrors] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showToaster, setShowToaster] = useState<boolean>(false);

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
    if (files.length == 0) {
      newErrorList.push('documents');
      isValid = false;
    }
    setCompanyFormErrors(newErrorList);

    return isValid;
  };

  const clearErrors = (field: string) => {
    const newErrorList = companyFormErrors.filter(item => item !== field);
    setCompanyFormErrors(newErrorList);
  };

  const onChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
    setCompanyFormData({
      ...companyFormData,
      [event.target.name]: event.target.value,
    });
    clearErrors(event.target.name);
  };

  const onChangeDate = (date: dayjs.Dayjs | null) => {
    setCompanyFormData({
      ...companyFormData,
      corporationDate: dayjs(date).format(),
    });
    clearErrors('corporationDate');
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
      clearErrors('documents');
    }
  };

  const handleClearFiles = () => {
    setFiles([]);
    setCompanyFormData({
      ...companyFormData,
      documents: [],
    });
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateFields()) {
      setIsLoading(true);
      dispatch(setCompanyData(companyFormData));
      try {
        const encryptedCompanyData = await encryptCompanyData(companyFormData);
        await axios
          .post('/', encryptedCompanyData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            console.log(response.data);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setShowToaster(true);
        setIsLoading(false);
      }
    }
  };

  return (
    <Stack justifyContent="space-between" alignItems="center" spacing={2}>
      {isLoading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={showToaster}
        onClose={() => setShowToaster(false)}
        key={'top' + 'left'}
        autoHideDuration={6000}
      >
        <Alert severity="success">Great! You are registered</Alert>
      </Snackbar>
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
    </Stack>
  );
};

export default Authentication;
