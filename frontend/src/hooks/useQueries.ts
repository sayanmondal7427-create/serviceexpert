import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, ApplianceService, ContactInquiry, ServiceCategory } from '../backend';
import { ExternalBlob } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetAllServiceCategories() {
  const { actor, isFetching } = useActor();

  return useQuery<ServiceCategory[]>({
    queryKey: ['serviceCategories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServiceCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllApplianceServices() {
  const { actor, isFetching } = useActor();

  return useQuery<ApplianceService[]>({
    queryKey: ['applianceServices'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllApplianceServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetServicesByCategory(categoryId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<ApplianceService[]>({
    queryKey: ['applianceServices', categoryId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServicesByCategory(categoryId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactInquiry() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ name, email, message }: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactInquiry(name, email, message);
    },
  });
}

export function useUploadProfilePhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (photo: ExternalBlob) => {
      if (!actor) throw new Error('Actor not available');
      return actor.uploadProfilePhoto(photo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
