'use server'

export async function validateFork(url: string): Promise<{ valid: boolean; error?: string; repoName?: string }> {
  try {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/\s]+)/)
    if (!match) return { valid: false, error: 'Not a valid GitHub URL.' }
    const [, owner, repo] = match
    if (owner.toLowerCase() === 'criscadinu' || owner.toLowerCase() === 'binabrains') {
      return { valid: false, error: 'This is the original repository. Fork it first and paste your own fork URL.' }
    }
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })
    if (!response.ok) return { valid: false, error: 'Repository not found. Make sure your fork is public.' }
    const data = await response.json()
    if (!data.fork) return { valid: false, error: 'This repository is not a fork. Fork the nexus-corp-app first.' }
    if (data.parent?.full_name !== 'Criscadinu/nexus-corp-app') {
      return { valid: false, error: 'This is not a fork of the Nexus Corp app. Fork github.com/Criscadinu/nexus-corp-app.' }
    }
    return { valid: true, repoName: data.full_name }
  } catch {
    return { valid: false, error: 'Could not verify the repository. Check your URL and try again.' }
  }
}
