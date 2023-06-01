import { CompanyType } from '@/types/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

export const initialState: CompanyType = {
  companyName: '',
  corporationDate: dayjs().format(),
  address: '',
  documents: [],
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyData: (state, action: PayloadAction<CompanyType>) => {
      const { companyName, corporationDate, address, documents } =
        action.payload;
      return {
        ...state,
        companyName: companyName,
        corporationDate: corporationDate,
        address: address,
        documents: documents,
      };
    },
  },
});

export const { setCompanyData } = companySlice.actions;

export default companySlice.reducer;
