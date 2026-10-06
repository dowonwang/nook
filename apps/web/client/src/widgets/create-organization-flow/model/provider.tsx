'use client';

import { createContext, useContext, useMemo, useState } from 'react';

import type { Organization } from '$entities/organization';

interface CreateOrganizationFlowContext {
  organization: Organization | null;
  isOrganizationCreated: boolean;
  setOrganization: (organization: Organization | null) => void;
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
  const [organization, setOrganization] = useState<Organization | null>(null);

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
