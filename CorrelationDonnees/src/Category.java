
public class Category {
	private String nameCategory;
	private int indexCategory;
	private double coefCorrel;
	private String typeCategory;
    private int compteur;
    private int counterNo;
    private int counterYes;
	
	public Category(String nameCategory, int indexCategory, double coefCorrel, String typeCategory) {
		super();
		this.nameCategory = nameCategory;
		this.indexCategory = indexCategory;
		this.coefCorrel = coefCorrel;
		this.typeCategory = typeCategory;
        this.compteur = this.counterNo = this.counterYes = 0;
	}

	public String getTypeCategory() {
		return typeCategory;
	}

	public void setTypeCategory(String typeCategory) {
		this.typeCategory = typeCategory;
	}

	public String getNameCategory() {
		return nameCategory;
	}

	public void setNameCategory(String nameCategory) {
		this.nameCategory = nameCategory;
	}

	public int getIndexCategory() {
		return indexCategory;
	}

	public void setIndexCategory(int indexCategory) {
		this.indexCategory = indexCategory;
	}

	public double getCoefCorrel() {
		return coefCorrel;
	}

	public void setCoefCorrel(double coefCorrel) {
		this.coefCorrel = coefCorrel;
	}
	
	public int getCompteur() {
		return compteur;
	}

	public void setCompteur(int compteur) {
		this.compteur = compteur;
	}

	public int getCounterNo() {
		return counterNo;
	}

	public void setCounterNo(int counterNo) {
		this.counterNo = counterNo;
	}
	
	public int getCounterYes() {
		return counterYes;
	}

	public void setCounterYes(int counterYes) {
		this.counterYes = counterYes;
	}

	public void addValueToCoefCorrel(double valToAdd) {
		switch(this.typeCategory) {
			case "onsp":
				if (valToAdd > 0.9 && valToAdd < 2.1) {
					if (valToAdd < 1.1) {
						this.coefCorrel++;
						this.counterYes++;
					}else {
						this.coefCorrel--;
						this.counterNo++;
					}
					this.compteur++;
				}
				break;
			case "num":
                if (valToAdd > 0.1){
    				this.coefCorrel += valToAdd;
    				this.compteur++;
                }
				break;
			case "aime":
				if (valToAdd > 0.9 && valToAdd < 3.1) {
					if (valToAdd < 1.1) {
						this.coefCorrel++;
					}else if (valToAdd < 2.1) {
						this.coefCorrel += 0.5;
					}else if (valToAdd < 3.1) {
						this.coefCorrel += 0.25;
					}
					this.compteur++;
				}
				break;
			case "sel":
				if (valToAdd > 1.1 && valToAdd < 4.1) {
					if (valToAdd < 2.1) {
						this.coefCorrel += 0.25;
					}else if (valToAdd < 3.1) {
						this.coefCorrel += 0.75;
					}else if (valToAdd < 4.1) {
						this.coefCorrel++;
					}
					this.compteur++;
				}
				break;
			case "b11f":
				if (valToAdd > 1.1 && valToAdd < 8.1) {
					if (valToAdd < 2.1) {
						this.coefCorrel += 1.5;
					}else if (valToAdd < 3.1) {
						this.coefCorrel += 3.5;
					}else if (valToAdd < 4.1) {
						this.coefCorrel += 5.5;
					}else if (valToAdd < 5.1) {
						this.coefCorrel += 7.0;
					}else if (valToAdd < 6.1) {
						this.coefCorrel += 14;
					}else if (valToAdd < 7.1) {
						this.coefCorrel += 21;
					}else {
						this.coefCorrel += 28;
					}
					this.compteur++;
				}
				break;
			case "b12f":
				if (valToAdd > 1.1 && valToAdd < 10.1) {
					if (valToAdd < 2.1) {
						this.coefCorrel += 1.5;
					}else if (valToAdd < 3.1) {
						this.coefCorrel += 3.5;
					}else if (valToAdd < 4.1) {
						this.coefCorrel += 5.5;
					}else if (valToAdd < 5.1) {
						this.coefCorrel += 7.0;
					}else if (valToAdd < 6.1) {
						this.coefCorrel += 14;
					}else if (valToAdd < 7.1) {
						this.coefCorrel += 21;
					}else if (valToAdd < 8.1) {
						this.coefCorrel += 28;
					}else if (valToAdd < 9.1) {
						this.coefCorrel += 35;
					}else{
						this.coefCorrel += 42;
					}
					this.compteur++;
				}
				break;
			case "colmata":
				if (valToAdd > 0.9 && valToAdd < 4.1) {
					if (valToAdd < 1.1) {
						this.coefCorrel += 6.5;
					}else if (valToAdd < 2.1) {
						this.coefCorrel += 4.5;
					}else if (valToAdd < 3.1) {
						this.coefCorrel += 2;
					}else {
						this.coefCorrel += 0.5;
					}
					this.compteur++;
				}
				break;
			case "entrerep":
				if (valToAdd > 0.9 && valToAdd < 5.1) {
					if (valToAdd < 1.1) {
						this.coefCorrel += 28;
					}else if (valToAdd < 2.1) {
						this.coefCorrel += 15;
					}else if (valToAdd < 3.1) {
						this.coefCorrel += 7;
					}else if (valToAdd < 4.1) {
						this.coefCorrel += 2;
					}else {
						this.coefCorrel += 0.5;
					}
					this.compteur++;
				}
				break;
			case "fastfood":
				if (valToAdd > 0.9 && valToAdd < 6.1) {
					if (valToAdd < 1.1) {
						this.coefCorrel += 28;
					}else if (valToAdd < 2.1) {
						this.coefCorrel += 18;
					}else if (valToAdd < 3.1) {
						this.coefCorrel += 10;
					}else if (valToAdd < 4.1) {
						this.coefCorrel += 4;
					}else if (valToAdd < 5.1) {
						this.coefCorrel += 2;
					}else {
						this.coefCorrel += 0.5;
					}
					this.compteur++;
				}
				break;
			case "autreregme":
				break;
			case "age":
				break;
		}
	}
	
	@Override
    public int hashCode() {
      return nameCategory.hashCode();
    }

	@Override
	public String toString() {
		return ((Double)this.coefCorrel).toString();
	}
	
	
}
