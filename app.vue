<script setup lang="ts">
const isOpen = ref(false);
const editApplication = useEditApplication();
</script>

<template>
	<div class="bg-blue-100 w-screen h-screen flex items-center justify-center">
		<div class="">
			<!-- <UButton
				class="bg-slate-500 hover:bg-slate-700 duration-150"
				label="Открыть заявку"
				@click="isOpen = !isOpen"
			/>

			<USlideover v-model="isOpen"> </USlideover> -->
			<UCard
				class="flex flex-col flex-1"
				:ui="{
					body: { base: 'flex-1' },
					ring: '',
					divide: 'divide-y divide-gray-100 dark:divide-gray-800',
				}"
			>
				<template #header>
					<div class="flex items-center justify-between">
						<h3
							class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
						>
							Slideover
						</h3>
						<UButton
							color="gray"
							variant="ghost"
							icon="i-heroicons-x-mark-20-solid"
							class="-my-1"
							@click="isOpen = false"
						/>
					</div>
				</template>

				<div class="flex items-center justify-center">
					<UCard
						:ui="{
							base: 'w-80',
							rounded: 'rounded-[5px]',
							body: {
								base: 'grid gap-2',
								background: '',
								padding: 'sm:p-2 sm:pb-6',
							},
						}"
					>
						<HeaderUCard />
						<BodyUCard />
						<MainContact />
						<UButton
							v-if="editApplication"
							@click="editApplication = !editApplication"
							color="gray"
							variant="solid"
							block
							>Сохранить изменения</UButton
						>
					</UCard>
				</div>
			</UCard>
		</div>
	</div>
</template>
