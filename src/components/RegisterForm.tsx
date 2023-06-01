import { CompanyType } from '@/types/types';
import {
  Box,
  Button,
  Grid,
  Input,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
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

  const getIsValid = (fieldName: string) => {
    return !errorsList.some(item => item === fieldName);
  };

  return (
    <form onSubmit={handleRegister}>
      <Stack justifyContent="space-between" alignItems="center" spacing={2}>
        <TextField
          error={!getIsValid('companyName')}
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
            label="Corporation Date"
            value={dayjs(companyFormData.corporationDate)}
            onChange={newValue => onChangeDate(newValue)}
          />
        </LocalizationProvider>

        <TextField
          error={!getIsValid('address')}
          id="address"
          name="address"
          value={companyFormData.address}
          onChange={onChange}
          label="Address"
          variant="outlined"
          fullWidth
        />

        <Box sx={{ flexGrow: 1 }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid>
              <Typography
                sx={{
                  color: getIsValid('documents') ? '#000' : '#d32f2f',
                  paddingRight: '10px',
                }}
              >
                {companyFormData.documents.length} documents
              </Typography>
            </Grid>
            <Grid>
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
            </Grid>
          </Grid>
        </Box>

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

        <Button color="success" variant="outlined" type="submit" fullWidth>
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
