<template>
	<div class="edit-smoothie" v-if="smoothie">
		<h3 class="center-align indigo-text">Edit {{smoothie.title}} Smoothie</h3>


		<div class="toast pink" v-if="feedback">
			{{this.feedback}}
		</div>


		<form action="" @submit.prevent="editSmoothie()">
			<div class="row">

				<div class="field col s12 title ">
					<label for="title">Title</label>
					<input type="text" id="title" v-model="smoothie.title">
				</div>


				<div class="field col s12 add-ingredient ">
					<label for="add-ingredient">Add Ingredient</label>
					<input type="text"
					       id="add-ingredient"
					       @keydown.tab="addIngredient"
					       v-model="another">
					<div class="ingredients ">
						<div class="chip" v-for="(ing,index) in smoothie.ingredients" :key="index">
							{{ing}}
							<i
								class="close material-icons"
								@click="removeIngredient(index)"
							>close</i>
						</div>
					</div>
				</div>


				<div class="field col s12 center-align">
					<button class="btn pink">Edit Smoothie</button>
				</div>

			</div>
		</form>


	</div>
</template>

<script>
  import db from '@/firebase/init.js'
  import slugify from 'slugify'

  export default {
    name: "EditSmoothie",
    data(){
      return{
        smoothie :null,
        another: null,
        feedback: null
      }
    },
	  methods:{
      editSmoothie(){
        if (this.smoothie.title){
          this.smoothie.slug = slugify(this.smoothie.title,{
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })

          db.collection('smoothies').doc(this.smoothie.id).update({
            title: this.smoothie.title,
            slug: this.smoothie.slug,
            ingredients: this.smoothie.ingredients
          })
            .then(()=>{
              this.smoothie.slug = null
              this.smoothie.title = null
              this.smoothie.ingredients = []
              this.$router.push({ name: 'Index'})
            })
	          .catch(err=>{
	            console.log(err)
	          })
        }
        else {
          this.feedback = 'you must enter smoothie title to continue'
        }
      },
      addIngredient(){
        if (this.another){
          this.smoothie.ingredients.push(this.another)
          this.another = null
          this.feedback=null
        }else {
          this.feedback = 'you must enter value to continue'
        }
      },
      removeIngredient(ing){
        this.smoothie.ingredients.splice(ing,1)
      }
	  },
    created() {
			let ref = db.collection('smoothies').where('slug','==',this.$route
        .params.smoothie_slug)
		  ref.get()
			  .then(snapshot=>{
			    snapshot.forEach(doc=>{
            this.smoothie = doc.data()
            this.smoothie.id = doc.id
          })
			  })
    }
  }
</script>

<style scoped>
	.edit-smoothie{
		margin: 20px auto 0;
		padding: 20px;
		max-width: 500px;
	}

	.edit-smoothie .field{
		margin: 10px auto;
	}

	input:not([type]):focus:not([readonly]), input[type="text"]:not(.browser-default):focus:not([readonly]), input[type="password"]:not(.browser-default):focus:not([readonly]), input[type="email"]:not(.browser-default):focus:not([readonly]), input[type="url"]:not(.browser-default):focus:not([readonly]), input[type="time"]:not(.browser-default):focus:not([readonly]), input[type="date"]:not(.browser-default):focus:not([readonly]), input[type="datetime"]:not(.browser-default):focus:not([readonly]), input[type="datetime-local"]:not(.browser-default):focus:not([readonly]), input[type="tel"]:not(.browser-default):focus:not([readonly]), input[type="number"]:not(.browser-default):focus:not([readonly]), input[type="search"]:not(.browser-default):focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]) {
		border-bottom: 1px solid #e91e63;
		-webkit-box-shadow: 0 1px 0 0 #e91e63;
		box-shadow: 0 1px 0 0 #e91e63;
	}
</style>