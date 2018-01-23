import java.io.IOException;
import java.util.HashMap;
import java.util.List;

public class Calculator {
	private HashMap<String, HashMap<String, Category>> mapCorrelations;
	private List<List<String>> listHumans;
	private HashMap<String, Category> mapCategories;
	private HashMap<String, Integer> mapCounter;
	
	public Calculator(List<List<String>> listHumans) {
		this.listHumans = listHumans;
		this.mapCorrelations= new HashMap<>();
		this.mapCategories = new HashMap<String, Category>();
		this.mapCounter = new HashMap<>();
		initializeMapCorrelations();
		mapCounter.put("Underweight", 0);
		mapCounter.put("Normal weight", 0);
		mapCounter.put("Overweight", 0);
		mapCounter.put("Obesity", 0);
	}
	
	public void showResults(){
		this.calc();
		this.weightCorrelations();
		try {
			CSVWriter.TabToCSV(this.mapCorrelations, this.mapCategories);
		} catch (IOException e) {
			e.printStackTrace();
		}
//		for (Category categoryToPrint : this.mapCorrelations.get("Normal weight").values()) {
//                    //System.out.println(this.mapCorrelations.get("Obesity").size());
//                    //System.out.println(this.mapCounter.get("Obesity"));
//                    System.out.println(categoryToPrint.getNameCategory() + ": " + categoryToPrint.getCoefCorrel());
//		}
	}
	
	public void calc() {
		double imc = 0.0;
		for (List<String> human : this.listHumans){
			try{
				imc = Double.parseDouble(human.get(284));
				if (imc < 18.5){
					//case Underweight
					calcCorrelations("Underweight", human);
					mapCounter.put("Underweight", mapCounter.get("Underweight") + 1);
				}else if (imc >= 18.5 && imc <= 24.99){
					//case Normal weight
					calcCorrelations("Normal weight", human);
					mapCounter.put("Normal weight", mapCounter.get("Normal weight") + 1);
				}else if (imc >= 25.0 && imc <= 30.0){
					//case Overweigth
					calcCorrelations("Overweight", human);
					mapCounter.put("Overweight", mapCounter.get("Overweight") + 1);
				}else{
					//case Obesity
					calcCorrelations("Obesity", human);
					mapCounter.put("Obesity", mapCounter.get("Obesity") + 1);
				}
			}catch(Exception e){
//					System.out.println(e.toString());
			}
			
		}
	}
	
	public void calcCorrelations(String caseWeigth, List<String> human){
		for (String tempCategoryName : mapCategories.keySet()){
			Category currentCategory = mapCorrelations.get(caseWeigth).get(tempCategoryName);
			double valueToAdd = this.getValueFromIndex(currentCategory.getIndexCategory(), human);
			currentCategory.addValueToCoefCorrel(valueToAdd);
		}
	}
	
	public double getValueFromIndex(int index, List<String> human) {
		double value;
		try {
			value = Double.parseDouble(human.get(index));
		} catch (Exception e) {
			//In case the value is empty or corrupted.
			value = 0.0;
		}
		return value;
	}
	
	private void initializeMapCorrelations(){
		for (int i=0; i < 4; i++) {
			mapCategories.put("aptotal_hebdo", new Category("aptotal_hebdo", 301, 0.0, "num"));
			mapCategories.put("bonalim", new Category("bonalim", 47, 0.0, "onsp"));
			mapCategories.put("colmata", new Category("colmata", 3, 0.0, "colmata"));
			mapCategories.put("distbar", new Category("distbar", 189, 0.0, "onsp"));
			mapCategories.put("distsoda", new Category("distsoda", 187, 0.0, "onsp"));
			mapCategories.put("distsoli", new Category("distsoli", 7, 0.0, "onsp"));
			mapCategories.put("distgat", new Category("distgat", 190, 0.0, "onsp"));
			mapCategories.put("distconf", new Category("distconf", 5, 0.0, "onsp"));
			mapCategories.put("distbiss", new Category("distbiss", 191, 0.0, "onsp"));
			mapCategories.put("entrerep", new Category("entrerep", 2, 0.0, "entrerep"));
			mapCategories.put("fastfood", new Category("fastfood", 8, 0.0, "fastfood"));
			mapCategories.put("fqfec", new Category("fqfec", 104, 0.0, "b11f"));
			mapCategories.put("fqfl", new Category("fqfl", 107, 0.0, "b12f"));
			mapCategories.put("fqpl", new Category("fqpl", 106, 0.0, "b11f"));
			mapCategories.put("fqvpo", new Category("fqvpo", 105, 0.0, "b11f"));
			mapCategories.put("intalicuisi", new Category("intalicuisi", 173, 0.0, "onsp"));
			mapCategories.put("mfrom", new Category("mfrom", 139, 0.0, "aime"));
			mapCategories.put("mfruit", new Category("mfruit", 137, 0.0, "aime"));
			mapCategories.put("mglace", new Category("mglace", 138, 0.0, "aime"));
			mapCategories.put("mjus", new Category("mjus", 144, 0.0, "aime"));
			mapCategories.put("mlait", new Category("mlait", 142, 0.0, "aime"));
			mapCategories.put("mleg", new Category("mleg", 135, 0.0, "aime"));
			mapCategories.put("mpois", new Category("mpois", 140, 0.0, "aime"));
			mapCategories.put("msoda", new Category("msoda", 141, 0.0, "aime"));
			mapCategories.put("mvian", new Category("mvian", 136, 0.0, "aime"));
			mapCategories.put("myao", new Category("myao", 143, 0.0, "aime"));
			mapCategories.put("autreregmedic_cod", new Category("autreregmedic_cod", 158, 0.0, "autreregme"));
			mapCategories.put("selassent", new Category("selassent", 10, 0.0, "sel"));
			mapCategories.put("selassfec", new Category("selassfec", 12, 0.0, "sel"));
			mapCategories.put("selassleg", new Category("selassleg", 11, 0.0, "sel"));
			mapCategories.put("selassoeuf", new Category("selassoeuf", 15, 0.0, "sel"));
			mapCategories.put("selassvp", new Category("selassvp", 13, 0.0, "sel"));
			mapCategories.put("selassvps", new Category("selassvps", 14, 0.0, "sel"));
			mapCategories.put("tage", new Category("tage", 278, 0.0, "age"));
			mapCategories.put("tele", new Category("tele", 289, 0.0, "num"));
			mapCategories.put("v2_age", new Category("v2_age", 273, 0.0, "num"));
			if (i == 0) {
				this.mapCorrelations.put("Underweight", new HashMap<>(mapCategories));
				mapCategories = new HashMap<>();
			}else if (i == 1) {
				this.mapCorrelations.put("Normal weight", new HashMap<>(mapCategories));
				mapCategories = new HashMap<>();
			}else if (i == 2) {
				this.mapCorrelations.put("Overweight", new HashMap<>(mapCategories));
				mapCategories = new HashMap<>();
			}else {
				this.mapCorrelations.put("Obesity", new HashMap<>(mapCategories));	
			}
		}
	}
	
	public void weightCorrelations() {
		for (String categoryIbm : mapCorrelations.keySet()) {
			for (Category categoryToUpdate : mapCorrelations.get(categoryIbm).values()) {
				//int numberInThisIBMCategory = this.mapCounter.get(categoryIbm.toString());
				categoryToUpdate.setCoefCorrel(categoryToUpdate.getCoefCorrel() / categoryToUpdate.getCompteur());
			}
		}
	}
}
