<script setup>
import axios from 'axios';

// Объявление переменной заявки
const appCard = ref({});

// Объявление leadData, reference, и contacts
const leadData = ref();
const reference = ref();
const contacts = ref({});

const loading = ref(true);
const error = ref(null);

async function fetchData() {
	try {
		loading.value = true;
		const response = await axios.get(
			'https://5ec761cf17a971bb.mokky.dev/m2lab'
		);

		// Положил в appCard первую заявку
		appCard.value = response.data[0];

		// Присвоение данных leadData, reference, и contacts
		leadData.value = appCard.value.leadData;
		reference.value = appCard.value.reference;
		contacts.value = leadData.value.contacts;
	} catch (err) {
		error.value = err.message;
	} finally {
		loading.value = false;
	}
}

// Открытие заявки
const openAppCard = ref(false);

// Прокидывание данных через компоненты
provide('appCard', {
	appCard,
	leadData,
	reference,
	contacts,
	loading,
	error,
});

onMounted(fetchData);
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
						<MainContact />
					</UCard>
				</div>
			</UCard>
		</USlideover>
	</div>
</template>
