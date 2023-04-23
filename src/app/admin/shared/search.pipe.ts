import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "./interfaces";
// filter pipe
@Pipe({
  name: 'searchPosts'
})
export class SearchPipe implements PipeTransform{
  transform(posts: Post[],search = ''): Post[] {
    // якщо строка пуста, тоді повертаєм масив постів.
    if(!search.trim()){
      return posts
    } else {
      return posts.filter(post => {
        return post.title.toLowerCase().includes(search.toLowerCase())
      })
    }
  }

}
