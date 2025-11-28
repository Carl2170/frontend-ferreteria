import { VariableItem } from '@/app/components/VariableItem';

export default function VariablesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Variables de Entorno - Azure Key Vault</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Variables Públicas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            🌐 Variables Públicas
          </h2>
          <div className="space-y-3">
            <VariableItem 
              name="NEXT_PUBLIC_URL_CLIENT" 
              value={process.env.NEXT_PUBLIC_URL_CLIENT}
            />
            <VariableItem 
              name="NEXT_PUBLIC_URL_CATEGORY" 
              value={process.env.NEXT_PUBLIC_URL_CATEGORY}
            />
            <VariableItem 
              name="NEXT_PUBLIC_URL_PRODUCT" 
              value={process.env.NEXT_PUBLIC_URL_PRODUCT}
            />
            <VariableItem 
              name="NEXT_PUBLIC_URL_AUTH" 
              value={process.env.NEXT_PUBLIC_URL_AUTH}
            />
          </div>
        </div>

        {/* Secrets desde Key Vault */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            🔐 Secrets desde Key Vault
          </h2>
          <div className="space-y-3">
            <VariableItem 
              name="DATABASE_URL" 
              value={process.env.DATABASE_URL}
              isSecret={true}
            />
            <VariableItem 
              name="JWT_SECRET" 
              value={process.env.JWT_SECRET}
              isSecret={true}
            />
            <VariableItem 
              name="API_KEY" 
              value={process.env.API_KEY}
              isSecret={true}
            />
            {/* <VariableItem 
              name="AZURE_STORAGE_CONNECTION_STRING" 
              value={process.env.AZURE_STORAGE_CONNECTION_STRING}
              isSecret={true}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}