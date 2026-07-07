import type { VercelRequest, VercelResponse } from '@vercel/node';

const VERCEL_API = 'https://api.vercel.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    return res.status(500).json({
      error:
        "VERCEL_TOKEN n'est pas configuré côté serveur. Ajoute-le dans les variables d'environnement du projet sur Vercel.",
    });
  }

  const projectId = (req.query.projectId as string) || '';
  if (!projectId) {
    return res.status(400).json({ error: 'Le paramètre projectId est requis' });
  }

  // production | preview | development (optionnel : sinon toutes les cibles)
  const target = (req.query.target as string) || '';

  const teamId = process.env.VERCEL_TEAM_ID;
  const params = new URLSearchParams({ decrypt: 'true' });
  if (teamId) params.set('teamId', teamId);

  try {
    const response = await fetch(
      `${VERCEL_API}/v9/projects/${encodeURIComponent(projectId)}/env?${params.toString()}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!response.ok) {
      const detail = await response.text();
      return res
        .status(response.status)
        .json({ error: `Erreur API Vercel (${response.status})`, detail });
    }

    const data = (await response.json()) as { envs?: any[] };
    let envs = data.envs || [];

    if (target) {
      envs = envs.filter((e) =>
        Array.isArray(e.target) ? e.target.includes(target) : e.target === target
      );
    }

    const variables = envs.map((e) => ({
      key: e.key as string,
      // Les variables de type "sensitive" ne sont jamais renvoyées déchiffrées par Vercel
      value: (e.value ?? '') as string,
      type: (e.type ?? 'plain') as string,
      target: e.target as string[] | string,
    }));

    return res.status(200).json({ variables });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Erreur inconnue' });
  }
}
