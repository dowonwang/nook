import { CreateOrganizationFlowContent } from './content';
import { CreateOrganizationFlowProvider } from '../model/provider';

export function CreateOrganizationFlow() {
  return (
    <CreateOrganizationFlowProvider>
      <CreateOrganizationFlowContent />
    </CreateOrganizationFlowProvider>
  );
}
