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
      return {
        ...state,
        companyName: action.payload.companyName,
        corporationDate: action.payload.corporationDate,
        address: action.payload.address,
        documents: action.payload.documents,
      };
    },
  },
});

export const { setCompanyData } = companySlice.actions;

export default companySlice.reducer;
