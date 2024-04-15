<template>
	<div class="grid grid-cols-2 gap-2">
		<GetDate :title="'Дата создания'" :createdAt="true" />
		<BodyUCardLeadBoards />
		<BodyUCardManagerList />
	</div>
</template>
