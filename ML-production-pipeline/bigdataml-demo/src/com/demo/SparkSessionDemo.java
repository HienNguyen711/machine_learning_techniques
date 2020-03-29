package com.demo;



public class SparkSessionDemo {
    SparkSession spark = SparkSession.builder()
            .master("local[8]")
            .appName("KMeansExpt")
            .getOrCreate();

    // Load and parse data
    String filePath = "/home/data/covtypeNorm.csv";
    // Selected K value
    int k =  27;

    // Loads data.
    Dataset<Row> inDataset = spark.read()
            .format("com.databricks.spark.csv")
            .option("header", "true")
            .option("inferSchema", true)
            .load(filePath);
    ArrayList<String> inputColsList = new ArrayList<String>(Arrays.asList(inDataset.columns()));

//Make single features column for feature vectors
inputColsList.remove("class");
    String[] inputCols = inputColsList.parallelStream().toArray(String[]::new);

    //Prepare dataset for training with all features in "features" column
    VectorAssembler assembler = new VectorAssembler().setInputCols(inputCols).setOutputCol("features");
    Dataset<Row> dataset = assembler.transform(inDataset);

    KMeans kmeans = new KMeans().setK(k).setSeed(1L);
    KMeansModel model = kmeans.fit(dataset);

    // Evaluate clustering by computing Within Set Sum of Squared Errors.
    double SSE = model.computeCost(dataset);
System.out.println("Sum of Squared Errors = " + SSE);

spark.stop();
}
