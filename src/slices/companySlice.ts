import { CompanyType } from '@/types/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: CompanyType = {
  companyName: '',
  crporationDate: '',
  address: '',
  documents: [],
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyData: (state, action: PayloadAction<CompanyType>) => {
      return { ...state, company: action.payload };
    },
  },
});

export const { setCompanyData } = companySlice.actions;

export default companySlice.reducer;
