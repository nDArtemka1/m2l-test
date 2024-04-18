<script setup>
import axios from 'axios';

// Тестил API
const appCard = ref({});

// Получение leadData и reference
const leadData = ref({});
const reference = ref({});
const contacts = ref({});

const loading = ref(true);
const error = ref(null);

async function fetchData() {
	try {
		loading.value = true;
		const response = await axios.get(
			'https://5ec761cf17a971bb.mokky.dev/m2lab'
		);

		appCard.value = response.data[0];

		// Присвоение данных leadData и reference
		leadData.value = appCard.value.leadData;
		reference.value = appCard.value.reference;

		contacts.value = leadData.value.contacts;
	} catch (err) {
		error.value = err.message;
	} finally {
		loading.value = false;
	}
}

const editApplication = useEditApplication();

async function updateAppCard() {
	try {
		loading.value = true;
		await axios.patch('https://5ec761cf17a971bb.mokky.dev/m2lab/1', {
			leadData: {
				createdAt: '05.04.2019 10:58:44',
				updatedAt: '09.04.2024 16:11:14',
				manager: 128,
				leadStatus: 417,
				leadSource: 1,
				board: 209,
				leadName: 'Новая заявка',
				leadColor: null,
				tags: [],
				agency: null,
				object: 86,
				rooms: null,
				objectNumber: '175',
				realtyCategory: null,
				contacts: {
					name: contacts.value.name,
					phone: contacts.value.phone,
					email: null,
					socialType: null,
					nickName: null,
					additionalContacts: [
						{
							contact: '79063361213',
							description: 'Гагарин Анатолий',
						},
					],
				},
			},
		});
	} catch (err) {
		error.value = err.message;
	} finally {
		editApplication.value = !editApplication.value;
		loading.value = false;
	}
}

onMounted(fetchData);
</script>

<template>
	<div>
		<p v-if="loading">Loading...</p>
		<p v-else-if="error">{{ error }}</p>

		<div v-else class="grid gap-2">
			<UForm
				:state="contacts"
				class="space-y-2 [&_label]:font-normal [&_label]:text-sm [&_label]:leading-6 [&_label]:text-gray-400"
				@submit="updateAppCard"
			>
				<UFormGroup label="ФИО" name="name">
					<span
						v-if="!editApplication && contacts.name === null"
						class="text-base leading-6 text-gray-950"
					>
						ФИО не указано
					</span>
					<span
						v-if="!editApplication"
						class="text-base leading-6 text-gray-950"
						>{{ contacts.name }}</span
					>
					<UInput v-else v-model="contacts.name" />
				</UFormGroup>

				<UFormGroup label="Номер телефона" name="phone">
					<span
						v-if="!editApplication"
						class="text-base leading-6 text-blue-600"
						>{{ contacts.phone }}</span
					>
					<UInput v-else v-model="contacts.phone" type="phone" />
				</UFormGroup>
				<UButton
					v-if="editApplication"
					color="gray"
					variant="solid"
					class="mt-5"
					type="submit"
					block
				>
					Сохранить изменения
				</UButton>
			</UForm>
		</div>
	</div>
</template>
