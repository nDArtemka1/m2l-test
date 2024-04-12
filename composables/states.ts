export const useEditApplication = () =>
	useState<boolean>('editApplication', () => false);
