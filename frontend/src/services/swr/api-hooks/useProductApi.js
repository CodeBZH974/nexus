import useSWR from 'swr';
import { useContext } from 'react';
import AuthContext from 'src/context/AuthContext';
import axiosFetcher from 'src/services/axios/axiosFetcher';

export function useProjects() {
  const { user } = useContext(AuthContext);
  // La clé de la requête SWR est conditionnelle.
  // Si 'user' est null, la clé est null, et SWR ne lancera PAS la requête.
  // C'est le cœur de la correction pour éviter les appels API non authentifiés.
  const key = user ? '/projects/' : null;
  const { data, error, isLoading } = useSWR(key, axiosFetcher);
  return { projects: data, isLoading, error };
}

export function useProject(id) {
  const { user } = useContext(AuthContext);
  // On applique la même logique pour la récupération d'un seul projet.
  // La requête n'est lancée que si l'utilisateur est connecté ET qu'un id est fourni.
  const key = user && id ? `/projects/${id}/` : null;
  const { data, error, isLoading } = useSWR(key, axiosFetcher);
  return { project: data, isLoading, error };
}
