import { CreateOrganizationFlowContent } from './create-organization-content';
import { CreateOrganizationFlowProvider } from '../model/flow-provider';

export function CreateOrganizationFlow() {
  return (
    <CreateOrganizationFlowProvider>
      <CreateOrganizationFlowContent />
    </CreateOrganizationFlowProvider>
  );
}
