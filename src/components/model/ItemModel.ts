import { IItem } from "../../types";
import { Model } from "../base/Model";

export class ItemModel extends Model<IItem> implements IItem {
    id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}