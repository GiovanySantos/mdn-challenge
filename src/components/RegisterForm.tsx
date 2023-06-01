import { CompanyType } from '@/types/types';
import { Button, Input, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { ChangeEvent, FormEvent } from 'react';

interface IProps {
  handleRegister: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeDate: (date: dayjs.Dayjs | null) => void;
  companyFormData: CompanyType;
  errorsList: string[];
  handleUploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearFiles: () => void;
}

const RegisterForm: React.FC<IProps> = props => {
  const {
    handleRegister,
    onChange,
    onChangeDate,
    companyFormData,
    errorsList,
    handleUploadFile,
    handleClearFiles,
  } = props;

  const getDatePickerValue = () => {
    if (companyFormData.corporationDate !== '') {
      return dayjs(companyFormData.corporationDate);
    }
    return dayjs();
  };

  const getIsValid = (fieldName: string) => {
    return errorsList.some(item => item == fieldName);
  };

  return (
    <form onSubmit={handleRegister} className="flex w-56 flex-col gap-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <TextField
          error={getIsValid('companyName')}
          id="companyName"
          name="companyName"
          value={companyFormData.companyName}
          onChange={onChange}
          label="Company Name"
          variant="outlined"
          fullWidth
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format="LL"
            value={getDatePickerValue()}
            onChange={newValue => onChangeDate(newValue)}
          />
        </LocalizationProvider>

        <TextField
          error={getIsValid('address')}
          id="address"
          name="address"
          value={companyFormData.address}
          onChange={onChange}
          label="Address"
          variant="outlined"
          fullWidth
        />

        <div className="flex items-center gap-2">
          <Typography>{companyFormData.documents.length} documents</Typography>
          <Input
            type="file"
            disableUnderline
            onChange={handleUploadFile}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input">
            <Button color="success" variant="contained" component="span">
              Upload
            </Button>
          </label>
        </div>
        {companyFormData.documents.length > 0 && (
          <Button
            color="error"
            variant="contained"
            component="span"
            onClick={handleClearFiles}
          >
            Clear files
          </Button>
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        <Button
          style={{ backgroundColor: '#15B71A', color: '#fff' }}
          variant="contained"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
