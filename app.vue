<script setup lang="ts">
import { format } from 'date-fns';
const date = ref(new Date());

const isOpen = ref(false);

const items = [
	[
		{
			label: 'Редактировать поля',
		},
		{
			label: 'Настройка отображения',
		},
	],
];
</script>

<template>
	<div class="bg-blue-100 w-screen h-screen flex items-center justify-center">
		<div class="">
			<UButton
				class="bg-slate-500 hover:bg-slate-700 duration-150"
				label="Открыть заявку"
				@click="isOpen = true"
			/>

			<USlideover v-model="isOpen">
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

					<div class="h-full">
						<UCard
							:ui="{
								base: '',
								background: 'bg-white dark:bg-gray-900',
								divide: 'divide-y divide-gray-200 dark:divide-gray-800',
								ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
								rounded: 'rounded-[5px]',
								shadow: 'shadow',
								body: {
									base: '',
									background: '',
									padding: 'px-4 py-5 sm:p-2',
								},
								header: {
									base: '',
									background: '',
									padding: 'px-4 py-5 sm:px-2',
								},
								footer: {
									base: '',
									background: '',
									padding: 'px-4 py-4 sm:px-2',
								},
							}"
						>
							<div class="flex justify-between">
								<div class="flex flex-col justify-between">
									<h3
										class="text-base font-semibold leading-6 text-gray-950 dark:text-white"
									>
										Заявка с сайта
									</h3>
									<p class="text-xs leading-6 text-gray-400 dark:text-white">
										Обновлено: 30.09.2023
									</p>
								</div>

								<UDropdown
									:items="items"
									:popper="{ offsetDistance: -20, placement: 'bottom-start' }"
								>
									<UIcon
										class="w-5 h-5 text-gray-400 dark:text-gray-500"
										name="i-heroicons-cog-8-tooth"
										dynamic
									/>

									<template #item="{ item }">
										<span class="truncate">{{ item.label }}</span>
									</template>
								</UDropdown>
							</div>

							<div class="h-32">
								<div class="flex items-center justify-between">
									<div class="flex flex-col justify-between">
										<p class="text-sm leading-6 text-gray-400 dark:text-white">
											Дата создания
										</p>
										<UPopover :popper="{ placement: 'bottom-start' }">
											<UButton
												icon="i-heroicons-calendar-days-20-solid"
												:label="format(date, 'd MMM, yyy')"
											/>

											<template #panel="{ close }">
												<DatePicker v-model="date" is-required @close="close" />
											</template>
										</UPopover>
									</div>

									<div class="flex flex-col justify-between">
										<p class="text-sm leading-6 text-gray-400 dark:text-white">
											Доска
										</p>
									</div>
								</div>
							</div>

							<template #footer>
								<div class="h-8"></div>
							</template>
						</UCard>
					</div>
				</UCard>
			</USlideover>
		</div>
	</div>
</template>
