<template>
	<div class="add-smoothie">
		<h3 class="center-align indigo-text">Add New Smoothie Recipe</h3>

		<div class="toast pink" v-if="feedback">
			{{this.feedback}}
		</div>

		<form action="" @submit.prevent="addSmoothie()">
			<div class="row">

				<div class="field col s12 title ">
					<label for="title">Title</label>
					<input type="text" id="title" v-model="title">
				</div>


				<div class="field col s12 add-ingredient ">
					<label for="add-ingredient">Add Ingredient</label>
					<input type="text"
					       id="add-ingredient"
					       @keydown.tab="addIngredient"
					       v-model="another">
					<div class="ingredients ">
						<div class="chip" v-for="(ing,index) in ingredients" :key="index">
							{{ing}}
							<i
								class="close material-icons"
								@click="removeIngredient(index)"
							>close</i>
						</div>
					</div>
				</div>


				<div class="field col s12 center-align">
					<button class="btn pink">Add Smoothie</button>
				</div>

			</div>
		</form>
	</div>
</template>

<script>
	import db from '@/firebase/init'
	import slugify from 'slugify'

  export default {
    name: "AddSmoothie",
    data(){
      return{
				title: null,
	      another: null,
	      ingredients: [],
        feedback: null,
	      slug: null
      }
    },
    methods:{
      addSmoothie(){
        if (this.title){

          this.slug = slugify(this.title,{
            replacement: '-',
	          remove: /[$*_+~.()'"!\-:@]/g,
	          lower: true
          })

	        db.collection('smoothies').add({
	          title: this.title,
	          ingredients: this.ingredients,
	          slug: this.slug
          })
	          .then(()=>{
	            this.slug = null
		          this.title = null
		          this.ingredients = []
	            this.$router.push({ name: 'Index'})
	          })
        }
        else {
          this.feedback = 'you must enter smoothie title to continue'
        }
      },
      addIngredient(){
        if (this.another){
          this.ingredients.push(this.another)
	        this.another = null
	        this.feedback=null
        }else {
          this.feedback = 'you must enter value to continue'
        }
      },
      removeIngredient(ing){
        this.ingredients.splice(ing,1)
      }

    }
  }
</script>

<style scoped>
	.add-smoothie{
		margin: 20px auto 0;
		padding: 20px;
		max-width: 500px;
	}

	.add-smoothie .field{
		margin: 10px auto;
	}

	input:not([type]):focus:not([readonly]), input[type="text"]:not(.browser-default):focus:not([readonly]), input[type="password"]:not(.browser-default):focus:not([readonly]), input[type="email"]:not(.browser-default):focus:not([readonly]), input[type="url"]:not(.browser-default):focus:not([readonly]), input[type="time"]:not(.browser-default):focus:not([readonly]), input[type="date"]:not(.browser-default):focus:not([readonly]), input[type="datetime"]:not(.browser-default):focus:not([readonly]), input[type="datetime-local"]:not(.browser-default):focus:not([readonly]), input[type="tel"]:not(.browser-default):focus:not([readonly]), input[type="number"]:not(.browser-default):focus:not([readonly]), input[type="search"]:not(.browser-default):focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]) {
		border-bottom: 1px solid #e91e63;
		-webkit-box-shadow: 0 1px 0 0 #e91e63;
		box-shadow: 0 1px 0 0 #e91e63;
	}
</style>