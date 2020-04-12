<template>
		<nav class="indigo">
			<div class="nav-wrapper container">
				<router-link :to="{name: 'Index'}">
					<span class="brand-logo center">
						Smoothies
					</span>
				</router-link>
				<a href="" class="btn-floating btn-large halfway-fab pink">
					<router-link :to="{ name: 'AddSmoothie' }">
						<i class="material-icons">add</i>
					</router-link>
				</a>

			</div>
		</nav>
</template>

<script>
  export default {
    name: "Navbar",
	  data(){
      return{

      }
	  }
  }
</script>

<style scoped>

</style>