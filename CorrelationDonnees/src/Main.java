public class Main {

	public static void main(String[] args) {
		Calculator calculator = new Calculator(LoaderData.readBooksFromCSV("Table_indiv.csv"));
		calculator.showResults();
		// TODO Auto-generated method stub
//		for (List<String> human : LoaderData.readBooksFromCSV("Table_indiv.csv")){
//			int i = 0;
//			for (String attr : human){
//				if (attr.equals("v2_age")){
//					System.out.print(attr + " " + i);
//				}
//				i++;
//			}
////			System.out.println();
//		}
	}

}
