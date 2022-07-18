export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) : PropertyDescriptor{
         const originalMethod = descriptor.value;
         const adjDescriptor: PropertyDescriptor = {
           get() {
               return originalMethod.bind(this);
           }
         }
         return adjDescriptor;
       }