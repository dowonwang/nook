'use client';

import { createContext, useContext, useMemo, useState } from 'react';

interface CreateOrganization {
  id: string;
  title: string;
}

interface CreateOrganizationFlowContext {
  organization: CreateOrganization | null;
  isOrganizationCreated: boolean;
  setOrganization: (organization: CreateOrganization | null) => void;
  resetOrganization: () => void;
}

const CreateOrganizationFlowContext =
  createContext<CreateOrganizationFlowContext | null>(null);

interface CreateOrganizationFlowProviderProps {
  children: React.ReactNode;
}

export function CreateOrganizationFlowProvider({
  children,
}: CreateOrganizationFlowProviderProps) {
  const [organization, setOrganization] = useState<CreateOrganization | null>(
    null,
  );

  const value = useMemo<CreateOrganizationFlowContext>(
    () => ({
      organization,
      isOrganizationCreated: organization !== null,
      setOrganization: setOrganization,
      resetOrganization: () => {
        setOrganization(null);
      },
    }),
    [organization],
  );

  return (
    <CreateOrganizationFlowContext.Provider value={value}>
      {children}
    </CreateOrganizationFlowContext.Provider>
  );
}

export function useCreateOrganizationFlow() {
  const context = useContext(CreateOrganizationFlowContext);

  if (!context) {
    throw new Error(
      'useCreateOrganizationFlow must be used within CreateOrganizationFlowProvider',
    );
  }

  return context;
}
