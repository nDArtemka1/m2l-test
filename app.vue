<script setup>
// Получение заявки
const { data: applicationCard } = await useFetch(
	'https://crm.m2lab.ru/api/internal/demo/demoLeadCardAccess',
	{
		lazy: false,
	}
);

// Получение leadData и reference
const leadData = ref(applicationCard.value.leadData);
const reference = ref(applicationCard.value.reference);

const openAppCard = ref(false);

// Прокидывание данных через компоненты
provide('appCard', {
	applicationCard,
	leadData,
	reference,
});
</script>

<template>
	<div class="bg-blue-100 w-screen h-screen flex items-center justify-center">
		<UButton
			class="bg-slate-500 hover:bg-slate-700 duration-150"
			label="Открыть заявку"
			@click="openAppCard = !openAppCard"
		/>

		<USlideover
			v-model="openAppCard"
			:ui="{
				width: 'max-w-sm',
			}"
			><UCard
				:ui="{
					rounded: 'rounded-none',
				}"
				class="flex flex-col flex-1"
			>
				<div class="flex items-center justify-center">
					<UCard
						:ui="{
							base: 'w-80',
							rounded: 'rounded-[5px]',
							body: {
								base: 'grid gap-2',
								padding: 'sm:p-2 sm:pb-6',
							},
						}"
					>
						<HeaderUCard :lead-data="leadData" />
						<BodyUCard />
						<MainContact :application-card="applicationCard" />
					</UCard>
				</div>
			</UCard>
		</USlideover>
	</div>
</template>
