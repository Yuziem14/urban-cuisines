import React, { useState, useContext, createContext } from 'react';

import { Tag } from '../interfaces';

interface RegisterData {
  name: string;
  description: string;
  phone_number: string;
  logo: File | null | undefined;
  address: string;
  latitude: number;
  longitude: number;
  tags: Tag[];
  customTags: string[];
}

interface IRegister {
  registerData: RegisterData;
  currentStep: number;
  setRegisterData: Function;
  setCurrentStep: Function;
  stepPositions: number[];
  FIRST_STEP: number;
  LAST_STEP: number;
}

const INITIAL_STATE: RegisterData = {
  name: '',
  description: '',
  phone_number: '',
  logo: null,
  address: '',
  latitude: 0,
  longitude: 0,
  tags: [],
  customTags: [],
};

const RegisterContext = createContext({} as IRegister);

export const RegisterProvider: React.FC = ({ children }) => {
  const [registerData, setRegisterData] = useState(INITIAL_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const stepPositions = [0, 1, 2];
  const FIRST_STEP = stepPositions[0];
  const LAST_STEP = stepPositions[stepPositions.length - 1];

  return (
    <RegisterContext.Provider
      value={{
        registerData,
        setRegisterData,
        currentStep,
        setCurrentStep,
        stepPositions,
        FIRST_STEP,
        LAST_STEP,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export function useRegister() {
  const context = useContext(RegisterContext);
  return context;
}

export default RegisterContext;
