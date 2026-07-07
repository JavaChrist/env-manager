export interface VercelProject {
  id: string;
  name: string;
  framework: string | null;
  updatedAt: number | null;
}

export interface VercelEnvVar {
  key: string;
  value: string;
  type: string;
  target: string[] | string;
}

export type VercelTarget = 'production' | 'preview' | 'development';

async function parseError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    return data.error || data.detail || `Erreur ${response.status}`;
  } catch {
    return `Erreur ${response.status}`;
  }
}

export const vercelService = {
  async listProjects(): Promise<VercelProject[]> {
    const response = await fetch('/api/vercel/projects');
    if (!response.ok) {
      throw new Error(await parseError(response));
    }
    const data = (await response.json()) as { projects: VercelProject[] };
    return data.projects || [];
  },

  async getEnv(projectId: string, target?: VercelTarget): Promise<VercelEnvVar[]> {
    const params = new URLSearchParams({ projectId });
    if (target) params.set('target', target);

    const response = await fetch(`/api/vercel/env?${params.toString()}`);
    if (!response.ok) {
      throw new Error(await parseError(response));
    }
    const data = (await response.json()) as { variables: VercelEnvVar[] };
    return data.variables || [];
  },
};

// Convertit une liste de variables Vercel en texte au format .env
export function envVarsToText(vars: VercelEnvVar[]): string {
  return vars
    .map((v) => {
      if (v.type === 'sensitive') {
        // Vercel ne renvoie jamais la valeur des variables "sensibles" : on met un placeholder
        return `${v.key}=`;
      }
      return `${v.key}=${v.value ?? ''}`;
    })
    .join('\n');
}
