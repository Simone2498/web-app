<?php
require("./fpdf182/fpdf.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define("HOST", "db-mysql-ams3-72238-do-user-9409391-0.b.db.ondigitalocean.com");//aggiungi :port se usi protoccolo TCP/IP
define("USER", "doadmin");
define ("PASSWORD", "y78sjj6jcokz0yoe");
define ("DATABASE", "legal");
define ("PORT", 25060); //
$mysqli= new mysqli(HOST, USER, PASSWORD, DATABASE, PORT);
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
$mysqli->query("SET NAMES 'utf8'");

class PDF extends FPDF{
    function __construct($orient, $unit, $size, $logo, $text){
        parent::__construct($orient, $unit, $size);
        $this->logo = $logo;
        $this->text = $text;
        $this->or = $orient;
    }
    function Header(){
        if($this->or=='P'){
            $w=$this->GetPageWidth();
            $this->Image($this->logo,10,6,55);
            $this->SetFont('Arial','I',10);
            $this->SetY(10);
            $this->Cell($w-70-10,0);
            $this->MultiCell(70,5,$this->text,0,'L',0);
            $this->Ln(1);
        }
        else{
            $w=$this->GetPageWidth();
            $this->Image($this->logo,10,6,33);
            $this->SetFont('Arial','I',6);
            $this->SetY(10);
            $this->Cell($w-70-10,0);
            $this->MultiCell(70,5,$this->text,0,'L',0);
            $this->Ln(1);
        }
    }
    function Footer(){
        $w=$this->GetPageWidth();
        $this->SetY(-15);
        $this->SetFont('Arial','I',10);
        $this->Cell(0,10,$this->PageNo().' di {nb}',0,0,'C');
        $this->SetX(150);
        $this->Image('./logo1.png',$w-65,$this->GetY()-2,25);
    }
}

$intro = "";

if(isset($_POST['report'])){
    $report = json_decode($_POST['report']); 
    $data_struct = [];
    foreach($report as $idx){
        $qry = "SELECT chapter, article, sub_article, gdpr_text, chapter_title, article_title FROM gdpr_enc WHERE id='".$idx."' ORDER BY id ASC";
        $res=$mysqli->query($qry);
        $res=$res->fetch_array();
        array_push($data_struct, $res);
    }
}
else{
    $data_struct = [[1,2,3,'ciao'],[1,3,1,'ciao numero 2']];
}
$pdf = new PDF('P', 'mm', 'A4', './logo1.png', $intro);
$pdf->AddPage();
$w=$pdf->GetPageWidth();

//print
$pdf->SetFont('Arial','B',16);
$pdf->Cell(0,20,'Prospetto del report generato',0,1,'C');
$ch_id=-1; 
$art_id=-1;
foreach ($data_struct as $law){
    $pdf->SetFont('Arial','B',10);
    if($ch_id!=$law[0]){ //Chapter
        $ch_id=$law[0];
        $pdf->SetX(10);
        $pdf->Cell(0,4,'Ch.'.$law[0].': '.$law[4],0,1,'L');
    }
    if($art_id!=$law[1]){ //Article
        $art_id=$law[1];
        $pdf->SetX(15);
        $pdf->Cell(0,4,'Art.'.$law[1].': '.$law[5],0,1,'L');
    }
    $pdf->SetX(17);
    $pdf->Cell(0,4,'comma.'.$law[2],0,1,'L'); //Comma
    //print text
    $pdf->SetX(20);
    $pdf->SetFont('Arial','I',8);
    $pdf->MultiCell($w-40,3,toUtf8($law[3]),0,'L',0);
}
$pdf->Output();

function toUtf8($str){
    return iconv('UTF-8', 'windows-1252', $str);
}


?>