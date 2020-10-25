import { Plugins } from "@capacitor/core";

export class IosUtils {
    static checkBrow = async (cb: (haveBrow: boolean) => void) => {
        try {
            const {name} = await Plugins.Device.getInfo()
            // Так как бровь пояилась только у устройств начиная с iphone 10
            // то в имени должна быть 1, SE не берем в счет
            console.log(name);

            cb(name!.includes('1'));
        } catch(error) {
            console.log('ERROR CHECK BROW');
            console.log(error.message);
        }
    }
}