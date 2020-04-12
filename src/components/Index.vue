<template>
  <div class="index">
    <div class="row">
      <div
        class="col s12 m6"
        v-for="smoothie in smoothies"
        :key="smoothie.id"
      >
        <div class="card blue-grey darken-1">
	        <div
		        class="btn-floating btn-small halfway pink delete-icon"
	          @click="deleteSmoothie(smoothie.id)">
		        <i class="material-icons ">delete</i>
	        </div>
	        <div
		        class="btn-floating btn-small halfway teal edit-icon">
		        <router-link
			        :to="{name: 'EditSmoothie' , params:{smoothie_slug:
								smoothie.slug}}">
			        <i class="material-icons ">edit</i>
		        </router-link>
	        </div>
		        <div class="card-content white-text">
	            <h4 class="card-title">{{smoothie.title}}</h4>
		          <hr class="white-text">

		          <ul class="ingredients">
			          <li
				          class="chip"
			            v-for="(ing,index) in smoothie.ingredients"
				          :key="index">
				          {{ing}}
			          </li>
		          </ul>
	          </div>
	        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init.js'


export default {
  name: 'Index',
  data () {
    return {
      smoothies:[]
    }
  },
	methods:{
    deleteSmoothie(id){
      // Delete doc from firestore
	    db.collection('smoothies').doc(id).delete()
		    .then(()=>{
          this.smoothies = this.smoothies.filter(smoothie => {
            return smoothie.id !== id
          })
        })
    }
	},
	created() {
		// fetch data from firestore
		db.collection('smoothies').get()
			.then(snapshot=>{
			  snapshot.forEach(doc=>{
			    let smoothie = doc.data()
				  smoothie.id = doc.id
          this.smoothies.push(smoothie)
        })
			})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.index{
		padding-top: 50px;
	}
	.card-title{
		margin-top: 5px;
		font-weight: 400;
		text-transform: capitalize;
	}
	.delete-icon{
		position: absolute;
		right: 10px;
		top: 10px;
	}
	.edit-icon{
		position: absolute;
		right: 50px;
		top: 10px;
	}
</style>
